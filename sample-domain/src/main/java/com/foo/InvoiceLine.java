package com.foo;

public class InvoiceLine {
    public Double quantity;
    public Double unitPrice;
    public Double price;
    public Integer vat;
    public String description;

    public InvoiceLine() {
    }

    public Double vatAmount;

    InvoiceLine(double quantity, double unitPrice, int vat) {
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.vat = vat;
    }
}
