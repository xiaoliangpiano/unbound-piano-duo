import HomePage from "@/components/HomePage";
import { getDictionary } from "@/data/i18n";

export default function Home() {
  return <HomePage dict={getDictionary("zh")} />;
}
