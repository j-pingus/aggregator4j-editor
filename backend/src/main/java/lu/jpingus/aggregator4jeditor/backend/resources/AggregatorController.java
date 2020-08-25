package lu.jpingus.aggregator4jeditor.backend.resources;

import com.crabshue.commons.aggregator.AggregatorContext;
import com.fasterxml.jackson.databind.ObjectMapper;
import lu.jpingus.aggregator4jeditor.backend.model.ExecutionTrace;
import lu.jpingus.aggregator4jeditor.backend.model.Project;
import lu.jpingus.aggregator4jeditor.backend.services.ClassLoaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import static com.crabshue.commons.aggregator.StringFunctions.isEmpty;
@RestController
@RequestMapping(value = "/api/v1/aggregator", produces = MediaType.APPLICATION_JSON_VALUE)
public class AggregatorController {
    @Autowired
    ClassLoaderService service;
    @Value("${editor.jarfolder}")
    String jarFolderPath;

    @PutMapping(value = "evaluate", produces = MediaType.APPLICATION_JSON_VALUE)
    public Object evaluate(@RequestBody Project project, @RequestParam(required = false) String expression) throws IOException{
        ObjectMapper mapper = new ObjectMapper();
        File jarFile = new File(jarFolderPath, project.getJarName());
        Class<?> modelClass = service.loadClass(jarFile, project.getClassName());
        Object o = mapper.reader().forType(modelClass).readValue(project.getJsonPayload());
        AggregatorContext context = AggregatorContext.builder()
                .config(project.getConfiguration())
                .classLoader(service.getClassLoader(jarFile))
                .debug(true)
                .build();

        return ExecutionTrace.builder()
                .result(context.process(o))
                .evaluated(isEmpty(expression)?null:context.evaluate(expression))
                .trace(context.getLastProcessTrace()).build();
    }

}

