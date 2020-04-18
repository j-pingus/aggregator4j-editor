package lu.jpingus.aggregator4jeditor.backend.services;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Service
class ClassLoaderService {
    private static final ConcurrentHashMap<File, ClassLoaderReference> classLoaders = new ConcurrentHashMap<>();

    List<String> getClasses(File jarFile, String packageName) {
        long timestamp = jarFile.lastModified();
        ClassLoaderReference reference = classLoaders.get(jarFile);
        if (reference == null || reference.timestamp == timestamp || reference.classes == null) {
            if (reference == null) {
                reference = new ClassLoaderReference();
                classLoaders.put(jarFile, reference);
            }
            if (reference.timestamp != timestamp) {
                reference.timestamp = timestamp;
            }
            reference.classes = new ArrayList<String>();
            ZipInputStream zip;
            try {
                zip = new ZipInputStream(new FileInputStream(jarFile));
                for (ZipEntry entry = zip.getNextEntry(); entry != null; entry = zip.getNextEntry()) {
                    if (!entry.isDirectory() && entry.getName().endsWith(".class")) {
                        // This ZipEntry represents a class. Now, what class does it represent?
                        String className = entry.getName().replace('/', '.'); // including ".class"
                        reference.classes.add(className.substring(0, className.length() - ".class".length()));
                    }
                }
                zip.close();
            } catch (IOException e) {
                throw new Error("Could not load classes from jar:" + jarFile.getName(), e);
            }
        }
        return reference.classes.stream()
                .filter(s -> s.startsWith(packageName))
                .collect(Collectors.toList());
    }

    class ClassLoaderReference {
        long timestamp;
        List<String> classes;
        ClassLoader classLoader;
    }
}
