package lu.jpingus.aggregator4jeditor.backend.services;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ClassLoaderServiceTest {
    private static File jarFile;
    private static ClassLoaderService service;
    @BeforeAll
    static void findJar() {
        jarFile = new File("src/test/resources/sample.jar");
        Assumptions.assumeTrue(jarFile.exists(), jarFile + " does not exist");
        service=new ClassLoaderService();
    }
    @Test
    void testGetClasses(){
        List<String> classes =service.getClasses(jarFile,"");
        Assertions.assertEquals(2,classes.size());
        classes =service.getClasses(jarFile,"com.foo");
        Assertions.assertEquals(2,classes.size());
        classes =service.getClasses(jarFile,"com.foo.InvoiceLi");
        Assertions.assertEquals(1,classes.size());
        System.out.println(classes);
    }
}