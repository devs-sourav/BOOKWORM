import ShopBradCumb from "@/components/products/ShopBradCumb";
import { Container } from "@/components/shared/Container";
import BookstoreSidebar from "@/components/shop/BookstoreSidebar";

export const metadata = {
  title: "BookWorm - Bookstore & Bookshop",
  description: "BookWorm – Your favorite online bookstore",
};

export default function RootLayout({ children }) {
  return (
    <div>
      <ShopBradCumb />
      <div className="py-16">
        <Container>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3">
              <BookstoreSidebar />
            </div>
            <div className="col-span-9">
              <div className=" ">{children}</div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
