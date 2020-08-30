import React from 'react';
import { Form, Input, Submit, Select, Label, ImgPicker } from '../../../common/components/forms';
import { FormProduct } from '../../../common/types/product.model';

const ProductFormFields = (
    { onSubmit, submitLabel, product } :
    {
        onSubmit: (product: FormProduct) => Promise<void>;
        submitLabel: string;
        product?: any;
    }) => {

    return (
        <Form defaultValues={product} onSubmit={onSubmit}>
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