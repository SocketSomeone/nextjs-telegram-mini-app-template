import type { RGB as RGBType } from "@tma.js/sdk-react";
import { FC, JSX } from "react";

import { bem } from "@/css/bem";
import { classNames } from "@/css/classnames";

import "./styles.css";

const [b, e] = bem("rgb");

export type RGBProps = JSX.IntrinsicElements["div"] & {
	color: RGBType;
};

export const RGB: FC<RGBProps> = ({ color, className, ...rest }) => (
	<span {...rest} className={classNames(b(), className)}>
    <i className={e("icon")} style={{ backgroundColor: color }} />
		{color}
  </span>
);
