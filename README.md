# Gundam System

本プロジェクトは、ガンダムの機体管理を行うシステムです。
バックエンドは Spring Boot (Java 17)、フロントエンドは React を使用しています。

---

## セットアップ手順

### 1. Eclipse のインストール

* [Eclipse IDE](https://www.eclipse.org/downloads/) をダウンロードしてインストールします。

### 2. リポジトリをクローン

```bash
git clone https://github.com/yutakayama673/gundam-system.git
cd gundam-system
```

### 3. Java 設定

* Java 17 を使用してください。
* Eclipse で JDK 17 を設定します。

### 4. バックエンド (Spring Boot)

* Eclipse でプロジェクトを **Maven プロジェクト** としてインポート
* 必要な依存関係 (Maven で管理される Spring Boot など) をダウンロード

### 5. フロントエンド設定

* `frontend` ディレクトリに移動

```bash
cd frontend
```

* Node.js をインストール

```bash
npm install
```

* フロントエンドを起動

```bash
npm start
```

### 6. データベース設定 (MySQL)

* MySQL をダウンロードしてインストール
* DB 名: `GundamDB`
* ユーザ名: `root`
* パスワード: 各自の環境に合わせて設定

### 7. application.properties 設定

* `src/main/resources/application.properties` を編集して、自分の環境に合わせてDB情報を設定してください。

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/GundamDB
spring.datasource.username=root
spring.datasource.password=あなたのパスワード
```

---

## 起動方法

1. Eclipse から Spring Boot を起動
2. `frontend` ディレクトリで `npm start`

---

## 使用技術

* Java 17
* Spring Boot
* Maven
* React (Node.js)
* MySQL

## DBDDL情報

・以下のディレクトリにDDLを格納しています。

gundam-system\mysqlDDL

・以下のディレクトリにデータを格納しています

gundam-system\mysqlDDL\data
