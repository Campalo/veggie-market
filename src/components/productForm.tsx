import React from 'react';
import { Form, Input, Submit, Select, Label, ImgPicker } from '../forms';
import { FormProduct, formProduct } from '../product/model';

const ProductFormFields = (
    { action, submitLabel, product } :
    {
        action: (product: FormProduct) => Promise<void>;
        submitLabel: string;
        product?: any;
    }) => {

    const currentProduct= product ? product : null;

    return (
        <Form defaultValues={formProduct(currentProduct)} onSubmit={action}>
            <ImgPicker name="image"/>
            <Label>Product Name</Label>
            <Input name="name" placeholder="Name of the product" />
            <Label>Price (€ / unit)</Label>
            <Input name="price" type="numeric" placeholder="Price" />
            <Label>Stock</Label>
            <Input name="stock" type="numeric" placeholder="Amount in Stock" />
            <Label>Unit</Label>
            <Select name="unit" options={['kg', 'unite']} />
            <Submit>{submitLabel}</Submit>
      </Form>
    );
}

export default ProductFormFields;