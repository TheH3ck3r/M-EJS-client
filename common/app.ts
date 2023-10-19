export const kBaseEndpoint =
  process.env.BASE_ENDPOINT == undefined
    ? "https://mejs.api.adev-team.ru"
    : process.env.BASE_ENDPOINT;

export const kAppVersion = () => {
  return process.env.VERSION;
};

export const animationFadeInClassNames =
  "animate__animated animate__fadeIn animate__faster";

export const animationFadeInDownClassNames =
  "animate__animated animate__fadeInDown animate__faster";

export enum ModifyStatuses {
  kCreate,
  kUpdate,
  kDelete,
}
