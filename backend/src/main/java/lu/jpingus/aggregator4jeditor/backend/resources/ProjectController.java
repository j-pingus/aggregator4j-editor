package lu.jpingus.aggregator4jeditor.backend.resources;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.jpingus.AggregatorContext;
import com.github.jpingus.ConfigurationFactory;
import com.github.jpingus.model.Aggregator4j;
import lombok.extern.slf4j.Slf4j;
import lu.jpingus.aggregator4jeditor.backend.model.Project;
import lu.jpingus.aggregator4jeditor.backend.model.ProjectReference;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@RestController
@RequestMapping("api/v1")
@Slf4j
public class ProjectController extends FileBasedController {
    public ProjectController(@Value("${editor.projectfolder}") String jarFolderPath) {
        super(jarFolderPath);
    }

    @GetMapping("projects/new")
    public Project newProject() throws IOException {
        Project ret = new Project();
        ret.setId(UUID.randomUUID().toString());
        ret.setName("New Project");
        ret.setConfiguration(new Aggregator4j());
        ret.setClassName("");
        ret.setJsonPayload("{}");
        saveFile(ret);
        return ret;

    }
    @PutMapping("projects")
    public void save(@RequestBody Project project) throws IOException {
        saveFile(project);
    }
    @GetMapping("project/{id}")
    public ResponseEntity<Project> read(@PathVariable("id")String id){
        File projectJson=new File(baseFolder,id+".json");
        if(projectJson.exists()){
            try {
                return ResponseEntity.ok().body(read(projectJson,Project.class));
            } catch (IOException e) {
                log.error("reading project "+id,e);
                return ResponseEntity.status(500).body(null);
            }
        }else{
            return ResponseEntity.status(404).body(null);
        }
    }
    @DeleteMapping("project/{id}")
    public void delete(@PathVariable("id")String id){
        File projectJson=new File(baseFolder,id+".json");
        if(projectJson.exists()){
            if(!projectJson.delete())
                throw new Error("Could not delete project with id "+id);
        }
        throw new Error("Project with id "+id+" not found");
    }
    @GetMapping("projects")
    public List<ProjectReference> getProjectReferences() {
        List<ProjectReference> ret = new ArrayList<>();
        for (File json : Objects.requireNonNull(baseFolder.listFiles((dir, name) -> name.endsWith(".json")))) {
            try {
                ret.add(read(json, ProjectReference.class));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return ret;
    }

    private <T> T read(File json, Class<T> modelClass) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        return mapper.readValue(json, modelClass);
    }

    private void saveFile(Project project) throws IOException {
        File toSave = new File(baseFolder, project.getId() + ".json");
        File toSaveXml = new File(baseFolder, project.getId() + ".xml");

        ObjectMapper mapper = new ObjectMapper();
        mapper.writerFor(Project.class).writeValue(toSave, project);

        AggregatorContext context = ConfigurationFactory.buildAggregatorContext(project.getConfiguration());
        ConfigurationFactory.extractConfig(context,new FileOutputStream(toSaveXml));
    }
}
