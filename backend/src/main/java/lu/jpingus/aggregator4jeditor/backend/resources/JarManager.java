package lu.jpingus.aggregator4jeditor.backend.resources;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController()
@RequestMapping(value = "/api/v1/jars",produces = MediaType.APPLICATION_JSON_VALUE)
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
    @PostMapping
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        String message;
        try {
            File dest=new File(jarFolderPath,file.getOriginalFilename());
            if(dest.exists()){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File already exist");
            }
            if(!dest.getName().endsWith(".jar")){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This is not a jar");
            }
            try {
                Files.copy(file.getInputStream(), Paths.get(dest.toURI()));
            } catch (Exception e) {
                throw new RuntimeException("FAIL!");
            }
            message = "Successfully uploaded!";
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } catch (Exception e) {
            message = "Failed to upload!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
        }
    }
    class myAnswer{
        public String message;

        public myAnswer(String message) {
            this.message = message;
        }
    }
    @DeleteMapping("/{jarName}")
    public ResponseEntity<myAnswer>deleteJar(@PathVariable("jarName")String jarName){
        File dest=new File(jarFolderPath,jarName);
        if(!dest.exists()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new myAnswer("File does not exist"));
        }
        dest.delete();
        String message=jarName+" deleted";
        return ResponseEntity.status(HttpStatus.OK).body(new myAnswer(message));
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
