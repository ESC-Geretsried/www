import React from "react";
import  Icon from "@ant-design/icons";
import TheFanSVG from "../../assets/thefan.svg";
import SpradeSVG from "../../assets/logo_sprade.svg";

const SpradeSVGIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <SpradeSVG {...props} />
);
const TheFanSVGIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <TheFanSVG {...props} />
);

const SpradeTVOutlined: React.FC<React.ComponentProps<typeof Icon>> = (props) => (
  <Icon component={SpradeSVGIcon} {...props} />
);
const TheFanOutlined: React.FC<React.ComponentProps<typeof Icon>> = (props) => (
  <Icon component={TheFanSVGIcon} {...props} />
);

export { SpradeTVOutlined, TheFanOutlined };
