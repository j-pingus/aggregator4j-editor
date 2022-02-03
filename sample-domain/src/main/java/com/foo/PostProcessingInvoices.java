package com.foo;



import com.crabshue.commons.aggregator.AggregatorContext;
import com.crabshue.commons.aggregator.AggregatorProcessing;

import java.util.ArrayList;
import java.util.Set;

public class PostProcessingInvoices implements AggregatorProcessing {
    public void preProcess(Object o, AggregatorContext aggregatorContext) {

    }

    public void postProcess(Object o, final AggregatorContext aggregatorContext) {
        if( o instanceof Invoices) {
            Invoices invoices = (Invoices) o;
            invoices.vatTotals = new ArrayList<>();
            Set<Integer> vatRates = aggregatorContext.asSet("vatRates");
            vatRates.forEach(rate -> {
                VatTotal vatTotal = new VatTotal();
                vatTotal.vat = rate;
                aggregatorContext.process(vatTotal);
                invoices.vatTotals.add(vatTotal);
            });

        }
    }
}
