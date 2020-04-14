package lu.jpingus.aggregator4jeditor.backend.resources;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController()
@RequestMapping(value = "/api/v1/jars", produces = MediaType.APPLICATION_JSON_VALUE)
public class JarController extends FileBasedController {

    public JarController(@Value("${editor.jarfolder}") String jarFolderPath) {
        super(jarFolderPath);
    }

    @GetMapping
    public List<String> getAllJars() {

        return Arrays.stream(
                Objects.requireNonNull(baseFolder.listFiles(pathname -> pathname.getName().endsWith(".jar"))))
                .map(File::getName)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        String message;
        try {
            File dest = new File(baseFolder, Objects.requireNonNull(file.getOriginalFilename()));
            if (dest.exists()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File already exist");
            }
            if (!dest.getName().endsWith(".jar")) {
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

    @DeleteMapping(value="/{jarName}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<myAnswer> deleteJar(@PathVariable("jarName") String jarName) {
        File dest = new File(baseFolder, jarName);
        if (!dest.exists()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new myAnswer("File does not exist"));
        }
        dest.delete();
        String message = jarName + " deleted";
        return ResponseEntity.status(HttpStatus.OK).body(new myAnswer(message));
    }

    public class myAnswer {

        String message;

        myAnswer(String message) {
            this.message = message;
        }
    }

}
