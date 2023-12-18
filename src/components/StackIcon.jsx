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

const StackIcon = ({ stack, color }) => {
  const size = 25;

  if (stack === 'Bootstrap') {
    return (
      <SiBootstrap
        color={color === 'black' ? 'black' : SiBootstrapHex}
        size={size}
      />
    );
  } else if (stack === 'CSS3') {
    return (
      <SiCss3
        color={color === 'black' ? 'black' : SiCss3Hex}
        size={size}
      />
    );
  } else if (stack === 'CodeIgniter') {
    return (
      <SiCodeigniter
        color={color === 'black' ? 'black' : SiCodeigniterHex}
        size={size}
      />
    );
  } else if (stack === 'Express') {
    return (
      <SiExpress
        color={color === 'black' ? 'black' : SiExpressHex}
        size={size}
      />
    );
  } else if (stack === 'Git') {
    return (
      <SiGit
        color={color === 'black' ? 'black' : SiGitHex}
        size={size}
      />
    );
  } else if (stack === 'GraphQL') {
    return (
      <SiGraphql
        color={color === 'black' ? 'black' : SiGraphqlHex}
        size={size}
      />
    );
  } else if (stack === 'HTML5') {
    return (
      <SiHtml5
        color={color === 'black' ? 'black' : SiHtml5Hex}
        size={size}
      />
    );
  } else if (stack === 'JavaScript') {
    return (
      <SiJavascript
        color={color === 'black' ? 'black' : SiJavascriptHex}
        size={size}
      />
    );
  } else if (stack === 'Laravel') {
    return (
      <SiLaravel
        color={color === 'black' ? 'black' : SiLaravelHex}
        size={size}
      />
    );
  } else if (stack === 'MongoDB') {
    return (
      <SiMongodb
        color={color === 'black' ? 'black' : SiMongodbHex}
        size={size}
      />
    );
  } else if (stack === 'MySQL') {
    return (
      <SiMysql
        color={color === 'black' ? 'black' : SiMysqlHex}
        size={size}
      />
    );
  } else if (stack === 'NestJS') {
    return (
      <SiNestjs
        color={color === 'black' ? 'black' : SiNestjsHex}
        size={size}
      />
    );
  } else if (stack === 'Node.js') {
    return (
      <SiNodedotjs
        color={color === 'black' ? 'black' : SiNodedotjsHex}
        size={size}
      />
    );
  } else if (stack === 'PHP') {
    return (
      <SiPhp
        color={color === 'black' ? 'black' : SiPhpHex}
        size={size}
      />
    );
  } else if (stack === 'PostgreSQL') {
    return (
      <SiPostgresql
        color={color === 'black' ? 'black' : SiPostgresqlHex}
        size={size}
      />
    );
  } else if (stack === 'Postman') {
    return (
      <SiPostman
        color={color === 'black' ? 'black' : SiPostmanHex}
        size={size}
      />
    );
  } else if (stack === 'React') {
    return (
      <SiReact
        color={color === 'black' ? 'black' : SiReactHex}
        size={size}
      />
    );
  } else if (stack === 'Tailwind CSS') {
    return (
      <SiTailwindcss
        color={color === 'black' ? 'black' : SiTailwindcssHex}
        size={size}
      />
    );
  } else if (stack === 'TypeScript') {
    return (
      <SiTypescript
        color={color === 'black' ? 'black' : SiTypescriptHex}
        size={size}
      />
    );
  } else if (stack === 'Vite') {
    return (
      <SiVite
        color={color === 'black' ? 'black' : SiViteHex}
        size={size}
      />
    );
  } else if (stack === 'Webpack') {
    return (
      <SiWebpack
        color={color === 'black' ? 'black' : SiWebpackHex}
        size={size}
      />
    );
  } else {
    return <p className='text-black'>{stack}</p>;
  }
};

export default StackIcon;
