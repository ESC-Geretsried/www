import { LinkBox, Box, LinkOverlay } from "@chakra-ui/layout";
import { PhysicalAddress } from "@microsoft/microsoft-graph-types";
import React from "react";
import { useTranslation } from "../../translation/useTranslation";
import { HeadingLevelBoundary, Hx } from "../headings";

type CalenderAddressProps = {
  address: PhysicalAddress | null | undefined;
  displayName: string | null | undefined;
  isLastChild?: boolean;
};

const getDirectionsUrl = (address: PhysicalAddress, displayName?: string) => {
  const base = "https://bing.com/maps/default.aspx?rtp=~adr.";
  const street = address.street ?? "";
  const city = address.city ?? "";
  const postalCode = address.postalCode ?? "";

  return (
    base +
    encodeURIComponent(
      `${displayName ? `${displayName}, ` : ""}${street} ${
        postalCode ? `${postalCode}, ` : ""
      }${city}`
    )
  );
};

export const CalenderAddress: React.FC<CalenderAddressProps> = ({
  displayName,
  address,
  isLastChild = true,
}) => {
  const [addressTitle] = useTranslation(["address"]);
  return (
    <HeadingLevelBoundary>
      <Hx variant="bold-body">{addressTitle}</Hx>
      <LinkBox role="group">
        <Box transition="color 0.15s" _groupHover={{ color: "brand.gold" }}>
          {displayName && (
            <>
              {address ? (
                <LinkOverlay
                  href={getDirectionsUrl(address, displayName)}
                  isExternal
                  backgroundImage="none"
                  _hover={{ backgroundImage: "none" }}
                >
                  {displayName}
                </LinkOverlay>
              ) : (
                <>{displayName}</>
              )}
              <br />
            </>
          )}
          {address?.street && (
            <>
              {address.street}
              <br />
            </>
          )}
          {address?.postalCode && (
            <>
              {address.postalCode}
              <br />
            </>
          )}
          {address?.city && (
            <>
              {address.city}
              <br />
            </>
          )}
          {!isLastChild && <br />}
        </Box>
      </LinkBox>
    </HeadingLevelBoundary>
  );
};
