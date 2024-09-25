// import Image from "next/image";
// import styles from "./page.module.css";
import { Card, Space } from "antd";
import Link from "next/link";

export default function Home() {
  return (
    <div className="center-screen">
      <Space direction="horizontal" size={16}>
        <Link href="/react-frontend">
          <Card size="small" title="Small size card" style={{ width: 300 }}>
            <p>Card content</p>
          </Card>
        </Link>
        <Link href="/form">
          <Card size="small" title="Small size card" style={{ width: 300 }}>
            <p>Card content</p>
          </Card>
        </Link>
      </Space>
    </div>
  );
}
