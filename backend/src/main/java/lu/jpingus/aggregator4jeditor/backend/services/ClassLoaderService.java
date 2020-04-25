package lu.jpingus.aggregator4jeditor.backend.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Service
@Slf4j
public class ClassLoaderService {
    private static final ConcurrentHashMap<File, ClassLoaderReference> classLoaders = new ConcurrentHashMap<>();

    private static String getFieldNameFromGetterMethod(Method m) {
        String name = m.getName().substring(3);
        name = Character.toLowerCase(name.charAt(0)) + name.substring(1);
        return name;
    }

    private ClassLoaderReference getClassLoaderReference(File jarFile) {
        long timestamp = jarFile.lastModified();
        ClassLoaderReference reference = classLoaders.get(jarFile);
        if (reference == null || reference.timestamp == timestamp || reference.classes == null) {
            if (reference == null) {
                reference = new ClassLoaderReference();
                classLoaders.put(jarFile, reference);
            }
            if (reference.timestamp != timestamp) {
                reference.timestamp = timestamp;
                reference.classes = null;
                reference.classLoader = null;
                reference.packages = null;
            }
        }
        return reference;
    }

    public List<String> getFields(File jarFile, String className) throws MalformedURLException {
        Set<String> fields = new HashSet<>();
        try {
            Class loadedClass = loadClass(jarFile,className);
            while (loadedClass != null && loadedClass != Object.class) {
                fields.addAll(
                        Arrays.stream(loadedClass.getDeclaredFields())
                                .filter(f -> Modifier.isPublic(f.getModifiers()))
                                .map(Field::getName)
                                .collect(Collectors.toList())
                );
                fields.addAll(
                        Arrays.stream(loadedClass.getMethods())
                                .filter(m -> Modifier.isPublic(m.getModifiers()))
                                .filter(m -> m.getName().startsWith("get"))
                                .filter(m -> m.getParameterCount() == 0)
                                .map(ClassLoaderService::getFieldNameFromGetterMethod)
                                .filter(s -> !"class".equals(s))
                                .collect(Collectors.toList())
                );
                loadedClass = loadedClass.getSuperclass();
            }

        } catch (Error e) {
            log.error("Error getting fields from " + jarFile.getName() + "/" + className, e);
        }
        List<String>ret = new ArrayList<>();
        ret.addAll(fields);
        Collections.sort(ret);
        return ret;
    }

    public List<String> getPackages(File jarFile) {
        if (getClassLoaderReference(jarFile).packages == null)
            getClasses(jarFile, "");
        return getClassLoaderReference(jarFile).packages;

    }

    public List<String> getClasses(File jarFile, String packageNameFilter) {
        ClassLoaderReference reference = getClassLoaderReference(jarFile);
        if (reference.classes == null) {
            reference.classes = new ArrayList<>();
            reference.packages = new ArrayList<>();
            ZipInputStream zip;
            try {
                zip = new ZipInputStream(new FileInputStream(jarFile));
                for (ZipEntry entry = zip.getNextEntry(); entry != null; entry = zip.getNextEntry()) {
                    if (!entry.isDirectory() && entry.getName().endsWith(".class")) {
                        // This ZipEntry represents a class. Now, what class does it represent?
                        String className = entry.getName().replace('/', '.'); // including ".class"
                        reference.classes.add(className.substring(0, className.length() - ".class".length()));
                    } else if (entry.isDirectory() && !entry.getName().startsWith("META-INF")) {
                        String packageName = entry.getName().replace('/', '.');
                        reference.packages.add(packageName.substring(0, packageName.length() - 1));
                    }
                }
                zip.close();
            } catch (IOException e) {
                throw new Error("Could not load classes from jar:" + jarFile.getName(), e);
            }
        }
        return reference.classes.stream()
                .filter(s -> s.startsWith(packageNameFilter==null?"":packageNameFilter))
                .collect(Collectors.toList());
    }

    public Class loadClass(File jarFile, String name) {
        try {
            return getClassLoader(jarFile).loadClass(name);
        } catch (ClassNotFoundException|MalformedURLException e) {
            throw new Error("Could not load class "+name+" from "+jarFile.getName(),e);
        }
    }

    public ClassLoader getClassLoader(File jarFile) throws MalformedURLException {
        ClassLoaderReference reference = getClassLoaderReference(jarFile);
        if (reference.classLoader == null) {
            reference.classLoader = new URLClassLoader(
                    new URL[]{jarFile.toURI().toURL()},
                    this.getClass().getClassLoader()
            );
        }
        return reference.classLoader;
    }

    class ClassLoaderReference {
        long timestamp;
        List<String> classes;
        List<String> packages;
        ClassLoader classLoader;
    }
}
