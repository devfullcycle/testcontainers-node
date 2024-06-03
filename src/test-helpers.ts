import { MySqlContainer, StartedMySqlContainer } from "@testcontainers/mysql";

export function startMysql() {
  let _mysqlContainer: StartedMySqlContainer;

  beforeAll(async () => {
    do {
      try {
        _mysqlContainer = await new MySqlContainer("mysql:8.0.30-debian")
          .withCommand([
            "--default-authentication-plugin=mysql_native_password",
          ])
          .withRootPassword("root")
          .withExposedPorts({
            container: 3306,
            host: 3306,
          })
          .withReuse()
          //.withTmpFs({ "/var/lib/mysql": "rw" })
          //   .withCopyContentToContainer({
          //     "./src/test/mysql/init.sql": "/docker-entrypoint-initdb.d/init.sql",
          //   })
          .start();
          break;
      } catch (e) {
        //@ts-ignore
        if (!e.message.includes("port is already allocated")) {
          throw e;
        }
      }
    } while (true);
  }, 20000);

  return {
    get mysqlContainer() {
      return _mysqlContainer;
    },
  };
}
