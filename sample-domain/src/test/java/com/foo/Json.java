package com.foo;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

class Json {
    @Test
    void makeJson() throws JsonProcessingException {
        Invoice i = new Invoice();
        i.lines=new InvoiceLine[]{
            new InvoiceLine(1,15.26,15),
            new InvoiceLine(50,1.5,18)
        };
        ObjectMapper mapper = new ObjectMapper();
        final String s = mapper.writer().writeValueAsString(i);
        System.out.println(s);
    }
}
