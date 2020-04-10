package lu.jpingus.aggregator4jeditor.backend.resources;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.github.jpingus.model.Aggregator4j;
import lu.jpingus.aggregator4jeditor.backend.model.Project;
import lu.jpingus.aggregator4jeditor.backend.model.ProjectReference;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/projects")
public class ProjectController extends FileBasedController {
    public ProjectController(@Value("${editor.projectfolder}") String jarFolderPath) {
        super(jarFolderPath);
    }

    @GetMapping("/new")
    public Project newProject() throws IOException {
        Project ret = new Project();
        ret.setId(UUID.randomUUID().toString());
        ret.setName("New Project");
        ret.setConfiguration(new Aggregator4j());
        ret.setClassName("");
        ret.setJsonPayload(new ObjectNode(new JsonNodeFactory(true)));
        save(ret);
        return ret;

    }

    @GetMapping
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

    private void save(Project project) throws IOException {
        File toSave = new File(baseFolder, project.getId() + ".json");
        ObjectMapper mapper = new ObjectMapper();
        mapper.writerFor(Project.class).writeValue(toSave, project);
    }
}
