package lu.jpingus.aggregator4jeditor.backend.model;

import com.crabshue.commons.aggregator.model.AggregatorConfiguration;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class Project extends ProjectReference{
    AggregatorConfiguration configuration;
    String jsonPayload;
    String className;
    String jarName;
}
