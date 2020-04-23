package lu.jpingus.aggregator4jeditor.backend.resources;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ExecutionTrace {
    Object result;
    String trace;
}
