import { useContext } from "react";
import Form from "./Form/Form";
import Header from "./Header/Header";
import Result from "./Result/Result";
import Container from "./UI/Container/Container";
import CurrencyContext from "../store/currency-context";
import Spinner from "./UI/Spinner/Spinner";
import Footer from "./Footer/Footer";

export default function App() {
  const currencyCtx = useContext(CurrencyContext);
  let content;

  if (currencyCtx.isLoading) {
    content = <Spinner />;
  }

  if (currencyCtx.isSuccess) {
    content = (
      <Container>
        <Form />
        <Result />
      </Container>
    );
  }

  return (
    <Container className="bg-orange-100 min-h-screen text-orange-700 text-lg border-[15px] border-orange-700">
      <Header />
      {content}
      <Footer />
    </Container>
  );
}
