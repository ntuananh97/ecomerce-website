import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <div>Home
      {t('hello')}
      <LanguageSwitcher />
    </div>
  )
}

export default Home