package lu.jpingus.aggregator4jeditor.backend.model;

import com.fasterxml.jackson.databind.JsonNode;
import com.github.jpingus.model.Aggregator4j;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class Project extends ProjectReference{
    Aggregator4j configuration;
    JsonNode jsonPayload;
    String className;
}
