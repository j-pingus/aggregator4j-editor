package lu.jpingus.aggregator4jeditor.backend.resources;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.jpingus.AggregatorContext;
import com.github.jpingus.ConfigurationFactory;
import com.github.jpingus.Processor;
import com.github.jpingus.model.Aggregator4j;
import lombok.Builder;
import lu.jpingus.aggregator4jeditor.backend.model.Project;
import lu.jpingus.aggregator4jeditor.backend.services.ClassLoaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;

@RestController
@RequestMapping(value = "/api/v1/aggregator", produces = MediaType.APPLICATION_JSON_VALUE)
public class AggregatorController {
    @Autowired
    ClassLoaderService service;
    @Value("${editor.jarfolder}")
    String jarFolderPath;

    @PutMapping(value="evaluate", produces = MediaType.APPLICATION_JSON_VALUE)
    public Object evaluate(@RequestBody Project project) throws IOException, ClassNotFoundException, NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        ObjectMapper mapper = new ObjectMapper();
        File jarFile = new File(jarFolderPath, project.getJarName());
        Class modelClass = service.loadClass(jarFile, project.getClassName());
        Object o = mapper.reader().forType(modelClass).readValue(project.getJsonPayload());
        AggregatorContext context = ConfigurationFactory
                .buildAggregatorContext(project.getConfiguration(), service.getClassLoader(jarFile));
        return ExecutionTrace.builder()
                .result(context.process(o))
                .trace(context.getLastProcessTrace()).build();
    }

}

