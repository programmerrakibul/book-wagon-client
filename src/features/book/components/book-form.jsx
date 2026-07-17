import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";

import { FormSection } from "@/components/shared/form-section";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  useBookFormats,
  useCategories,
  useSubCategories,
} from "@/features/book/hooks/use-categories";

function BookForm({
  schema,
  defaultValues,
  onSubmit,
  submitLabel = "Save",
  // eslint-disable-next-line no-unused-vars
  submitIcon: SubmitIcon = Save,
  isPending = false,
  imagePreviewUrl,
}) {
  const { data: categories = [] } = useCategories();
  const { data: bookFormats = [] } = useBookFormats();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const watchedValue = useWatch({ name: "categoryId", control });
  const disabled = isSubmitting || isPending;

  const { data: subCategories = [] } = useSubCategories({
    categoryId: watchedValue,
    enabled: !!watchedValue,
  });

  const categoryOptions = useMemo(
    () => categories.map((c) => ({ value: c._id, label: c.name })),
    [categories],
  );

  const subCategoryOptions = useMemo(
    () => [
      { value: "none", label: "None" },
      ...subCategories.map((s) => ({ value: s._id, label: s.name })),
    ],
    [subCategories],
  );

  const formatOptions = useMemo(
    () => bookFormats.map((f) => ({ value: f._id, label: f.name })),
    [bookFormats],
  );

  const sections = useMemo(
    () => [
      {
        title: "Basic Information",
        columns: 1,
        fields: [
          {
            name: "name",
            label: "Book Name",
            type: "input",
            placeholder: "Enter book name",
          },
          {
            name: "description",
            label: "Book Description",
            type: "textarea",
            placeholder: "Enter a detailed description of the book...",
          },
          {
            name: "bookImage",
            label: "Book Cover Image",
            type: "file",
            accept: "image/*",
            previewUrl: imagePreviewUrl,
          },
        ],
      },
      {
        title: "Author",
        columns: 1,
        fields: [
          {
            name: "author",
            label: "Author Name",
            type: "input",
            placeholder: "Enter author name",
          },
        ],
      },
      {
        title: "Classification",
        columns: 2,
        fields: [
          {
            name: "categoryId",
            label: "Category",
            type: "select",
            placeholder: "Select a category",
            options: categoryOptions,
          },
          {
            name: "subcategoryId",
            label: "Sub-Category",
            type: "select",
            placeholder: "Select a subcategory",
            options: subCategoryOptions,
          },
        ],
      },
      {
        title: "Details",
        columns: 2,
        fields: [
          {
            name: "publicationYear",
            label: "Publication Year",
            type: "input",
            inputType: "number",
            placeholder: "2024",
          },
          {
            name: "pageCount",
            label: "Page Count",
            type: "input",
            inputType: "number",
            placeholder: "300",
          },
          {
            name: "formatId",
            label: "Format",
            type: "select",
            placeholder: "Select format",
            options: formatOptions,
          },
          {
            name: "stock",
            label: "Stock",
            type: "input",
            inputType: "number",
            placeholder: "10",
          },
          {
            name: "weight",
            label: "Weight (kg)",
            type: "input",
            inputType: "number",
            step: "0.01",
            placeholder: "0.5",
          },
        ],
      },
      {
        title: "Pricing",
        columns: 3,
        fields: [
          {
            name: "price",
            label: "Price (\u09F3)",
            type: "input",
            inputType: "number",
            step: "0.01",
            placeholder: "0.00",
          },
          {
            name: "discount",
            label: "Discount (%)",
            type: "input",
            inputType: "number",
            placeholder: "0",
          },
          {
            name: "status",
            label: "Status",
            type: "select",
            placeholder: "Select status",
            options: [
              { value: "PUBLISHED", label: "PUBLISHED" },
              { value: "UNPUBLISHED", label: "UNPUBLISHED" },
            ],
          },
        ],
      },
    ],
    [categoryOptions, subCategoryOptions, formatOptions, imagePreviewUrl],
  );

  const handleFormSubmit = useCallback(
    (data) => handleSubmit(onSubmit)(data),
    [handleSubmit, onSubmit],
  );

  return (
    <form onSubmit={handleFormSubmit} className="space-y-5">
      {sections.map((section) => (
        <FormSection
          key={section.title}
          title={section.title}
          fields={section.fields}
          control={control}
          disabled={disabled}
          columns={section.columns}
        />
      ))}

      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={disabled} className="min-w-36 gap-2">
          {disabled ? (
            <Spinner className="size-4" />
          ) : (
            <SubmitIcon className="size-4" />
          )}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

export { BookForm };
