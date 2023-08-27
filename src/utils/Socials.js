const IMAGES_DIR = "assets/images";

const discord = () => ({
  label: "Discord",
  icon: `${IMAGES_DIR}/social_discord.png`,
  url: "https://discord.gg/" //TODO
});

const github = (repo) => ({
  label: "GitHub",
  icon: `${IMAGES_DIR}/social_github.png`,
  url: "https://github.com/aliernfrog"+(repo ? `/${repo}` : "")
});

export default {
  socials: {
    aliernfrog: [
      github(),
      discord()
    ],
    ensicord: [
      github("ensicord"),
      discord()
    ],
    lactool: [
      github("lac-tool"),
      discord()
    ]
  }
}