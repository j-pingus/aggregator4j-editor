package editor;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

class LoadJarTest {
    private static File jarFile;

    @BeforeAll
    static void findJar() {
        jarFile = new File("src/test/resources/sample.jar");
        Assumptions.assumeTrue(jarFile.exists(), jarFile + " does not exist");

    }

    @Test
    void loadJarFile() throws IOException {
        URLClassLoader child = new URLClassLoader(
                new URL[]{jarFile.toURI().toURL()},
                this.getClass().getClassLoader()
        );
        System.out.println(Arrays.toString(child.getURLs()));
    }

    @Test
    void findClassesInJar() throws IOException {
        List<String> classNames = new ArrayList<String>();
        ZipInputStream zip;
        zip = new ZipInputStream(new FileInputStream(jarFile));
        for (ZipEntry entry = zip.getNextEntry(); entry != null; entry = zip.getNextEntry()) {
            if (!entry.isDirectory() && entry.getName().endsWith(".class")) {
                // This ZipEntry represents a class. Now, what class does it represent?
                String className = entry.getName().replace('/', '.'); // including ".class"
                classNames.add(className.substring(0, className.length() - ".class".length()));
            }
        }
        zip.close();
        System.out.println(classNames);
    }
    @Test
    void loadInstanceFromJarAndJson() throws MalformedURLException, ClassNotFoundException, JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        String json="{\"lines\":[" +
                "{\"quantity\":1.0,\"unitPrice\":15.26,\"price\":null,\"vat\":15,\"vatAmount\":null}," +
                "{\"quantity\":50.0,\"unitPrice\":1.5,\"price\":null,\"vat\":18,\"vatAmount\":null}]," +
                "\"total\":null,\"vatTotal\":null}";
        URLClassLoader child = new URLClassLoader(
                new URL[]{jarFile.toURI().toURL()},
                this.getClass().getClassLoader()
        );
        Class c = child.loadClass("com.foo.Invoice");
        Object o = mapper.reader().forType(c).readValue(json);
        System.out.println(o.getClass().getName());

    }
}
