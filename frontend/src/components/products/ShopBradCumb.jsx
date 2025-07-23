import Breadcrumb from "../breadcumbs/Breadcrumb";


const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Biographies & Memoirs", href: "/category/biographies" },
  { label: "All You Can Ever Know: A Memoir" }, // current page, no href
];

export default function ShopBradCumb() {
  return (
    <div className="">
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
}
