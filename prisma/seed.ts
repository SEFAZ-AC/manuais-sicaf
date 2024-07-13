import db from "../src/lib/db";
import { hash } from "argon2";

async function main() {
  const firstUser = await db.user.createMany({
    data: [
      {
        username: "90732073200",
        password: await hash("12345678"),
        name: "Fernando Sosnoski",
        active: true,
        admin: true,
      },
    ],
  });
  const firstPage = await db.page.create({
    data: {
      name: "Início",
      slug: "/",
      userId: 1,
      active: true,
      icon: "home",
      content: JSON.stringify({
        time: 1714702544199,
        blocks: [
          {
            id: "4XxVkNr5GO",
            type: "header",
            data: { text: "Home", level: 1 },
          },
        ],
      }),
    },
  });
}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
