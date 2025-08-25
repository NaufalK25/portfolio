import {
  SiBootstrap,
  SiBootstrapHex,
  SiCodeigniter,
  SiCodeigniterHex,
  SiCss3,
  SiCss3Hex,
  SiExpress,
  SiExpressHex,
  SiGit,
  SiGitHex,
  SiGraphql,
  SiGraphqlHex,
  SiHtml5,
  SiHtml5Hex,
  SiJavascript,
  SiJavascriptHex,
  SiLaravel,
  SiLaravelHex,
  SiMongodb,
  SiMongodbHex,
  SiMysql,
  SiMysqlHex,
  SiNestjs,
  SiNestjsHex,
  SiNodedotjs,
  SiNodedotjsHex,
  SiPhp,
  SiPhpHex,
  SiPostgresql,
  SiPostgresqlHex,
  SiPostman,
  SiPostmanHex,
  SiReact,
  SiReactHex,
  SiTailwindcss,
  SiTailwindcssHex,
  SiTypescript,
  SiTypescriptHex,
  SiVite,
  SiViteHex,
  SiWebpack,
  SiWebpackHex
} from '@icons-pack/react-simple-icons';

const icons = {
  Bootstrap: { Icon: SiBootstrap, hex: SiBootstrapHex },
  CodeIgniter: { Icon: SiCodeigniter, hex: SiCodeigniterHex },
  CSS3: { Icon: SiCss3, hex: SiCss3Hex },
  Express: { Icon: SiExpress, hex: SiExpressHex },
  Git: { Icon: SiGit, hex: SiGitHex },
  GraphQL: { Icon: SiGraphql, hex: SiGraphqlHex },
  HTML5: { Icon: SiHtml5, hex: SiHtml5Hex },
  JavaScript: { Icon: SiJavascript, hex: SiJavascriptHex },
  Laravel: { Icon: SiLaravel, hex: SiLaravelHex },
  MongoDB: { Icon: SiMongodb, hex: SiMongodbHex },
  MySQL: { Icon: SiMysql, hex: SiMysqlHex },
  NestJS: { Icon: SiNestjs, hex: SiNestjsHex },
  'Node.js': { Icon: SiNodedotjs, hex: SiNodedotjsHex },
  PHP: { Icon: SiPhp, hex: SiPhpHex },
  PostgreSQL: { Icon: SiPostgresql, hex: SiPostgresqlHex },
  Postman: { Icon: SiPostman, hex: SiPostmanHex },
  React: { Icon: SiReact, hex: SiReactHex },
  'Tailwind CSS': { Icon: SiTailwindcss, hex: SiTailwindcssHex },
  TypeScript: { Icon: SiTypescript, hex: SiTypescriptHex },
  Vite: { Icon: SiVite, hex: SiViteHex },
  Webpack: { Icon: SiWebpack, hex: SiWebpackHex }
};

const StackIcon = ({ stack, color = 'default', size = 28 }) => {
  const stackData = icons[stack];

  if (!stackData) {
    return <p className='text-slate-600 dark:text-slate-300'>{stack}</p>;
  }

  const { Icon, hex } = stackData;
  const iconColor = color === 'black' ? 'black' : hex;

  return (
    <Icon
      color={iconColor}
      size={size}
    />
  );
};

export default StackIcon;
