import { Select } from "antd"
// import { usePathname } from "next/navigation"
import { useTranslation } from "react-i18next";

export default function LangSwitch() {
  // const pathname = usePathname()
  const { i18n } = useTranslation('ns1');

  function handleChange () {
    if (i18n.language === 'en') {
      i18n.changeLanguage('th')
    } else {
      i18n.changeLanguage('en')
    }
  }
  return (
    <div>
      <Select
        value={i18n.language}
        defaultValue="en"
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          { value: 'en', label: 'EN' },
          { value: 'th', label: 'TH' },
        ]}
      />
    </div>
  )
}
