package lu.jpingus.aggregator4jeditor.backend.model;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ExecutionTrace {
    Object result;
    String trace;
    Object evaluated;
}
