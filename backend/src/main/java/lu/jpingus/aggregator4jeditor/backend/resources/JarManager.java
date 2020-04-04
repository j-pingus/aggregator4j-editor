package lu.jpingus.aggregator4jeditor.backend.resources;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController()
@RequestMapping("/api/v1/jars")
public class JarManager {
    @Value("${editor.jarfolder}")
    String jarFolderPath;

    @GetMapping
    public List<String> getAllJars() {
        File jarFolder = getOrCreateJarFolder();
        return Arrays.stream(
                jarFolder.listFiles(pathname -> pathname.getName().endsWith(".jar")))
                .map(file -> file.getName())
                .collect(Collectors.toList());
    }

    private File getOrCreateJarFolder() {
        if (StringUtils.isEmpty(jarFolderPath)) {
            jarFolderPath = "my-jar-folder";
        }
        File ret = new File(jarFolderPath);
        if (ret.exists() && ret.isDirectory()) return ret;
        if (ret.exists()) throw new Error(ret + " is not a folder");
        if (ret.getAbsoluteFile().getParentFile().canWrite()) {
            ret.mkdirs();
            return ret;
        }
        throw new Error(ret + " could not be created");

    }

}
