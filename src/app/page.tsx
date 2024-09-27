// import Image from "next/image";
// import styles from "./page.module.css";
'use client';
import { Card, Space } from "antd";
import Link from "next/link";
import './i18n';
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation('ns1')
  return (
    <div>
      <div className="center-screen">
        <Space direction="horizontal" size={16}>
          <Link href="/react-frontend">
            <Card size="small" title={t('home.test1.title')} style={{ width: 300 }}>
              <p>{t('home.test1.description')}</p>
            </Card>
          </Link>
          <Link href="/form">
            <Card size="small" title={t('home.test2.title')} style={{ width: 300 }}>
              <p>{t('home.test2.description')}</p>
            </Card>
          </Link>
        </Space>
      </div>
    </div>
  );
}
