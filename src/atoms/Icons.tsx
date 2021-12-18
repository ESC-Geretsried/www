import { Icon, IconProps } from "@chakra-ui/react";
import React from "react";
import {
  FaFacebookSquare,
  FaInstagram,
  FaBell,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { GrDocumentPdf } from "react-icons/gr";

export const FacebookIcon: React.FC<IconProps> = (props) => (
  <Icon as={FaFacebookSquare} {...props} />
);
export const InstagramIcon: React.FC<IconProps> = (props) => (
  <Icon as={FaInstagram} {...props} />
);
export const TickarooIcon: React.FC<IconProps> = (props) => (
  <Icon as={FaBell} {...props} />
);
export const ChevronRightIcon: React.FC<IconProps> = (props) => (
  <Icon as={FaChevronRight} {...props} />
);
export const ChevronLeftIcon: React.FC<IconProps> = (props) => (
  <Icon as={FaChevronLeft} {...props} />
);

export const PdfIcon: React.FC<IconProps> = (props) => (
  <Icon as={GrDocumentPdf} {...props} />
);
