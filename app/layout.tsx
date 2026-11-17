import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "준영 인생 단톡방",
  description: "준영의 인생이 한 해 한 해 실시간으로 올라오는 단톡방.",
  appleWebApp: { capable: true, title: "준영 인생", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  themeColor: "#171b26",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard: 한글 메신저 UI에 제일 잘 맞는 산세리프.
            next/font/google에는 없어서 CDN의 동적 서브셋 빌드를 쓴다. */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
