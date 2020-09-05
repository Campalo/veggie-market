import React from 'react';
import { Form, Input, Submit, Select, Label, ImgPicker } from '../../../common/components/forms';
import { FormProduct, getUnitLabel } from '../../../common/types/product.model';
import { useTranslation } from "react-i18next";

const ProductFormFields = (
    { onSubmit, submitLabel, product } :
    {
        onSubmit: (product: FormProduct) => Promise<void>;
        submitLabel: string;
        product?: any;
    }) => {
    const { t } = useTranslation();

    const options = getUnitLabel();

    return (
        <Form defaultValues={product} onSubmit={onSubmit}>
            <ImgPicker name="image"/>
            <Label>{t("seller.product.name")}</Label>
            <Input name="name" placeholder={t("seller.product.namePlaceholder")} />
            <Label>{t("seller.product.price")}</Label>
            <Input name="price" type="numeric" placeholder={t("seller.product.pricePlaceholder")} />
            <Label>{t("seller.product.stock")}</Label>
            <Input name="stock" type="numeric" placeholder={t("seller.product.stockPlaceholder")}/>
            <Label>{t("seller.product.unit")}</Label>
            <Select name="unit" options={options} />
            <Submit>{submitLabel}</Submit>
      </Form>
    );
}

export default ProductFormFields;