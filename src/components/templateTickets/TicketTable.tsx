import { css } from "@emotion/react";
import React from "react";
import { Maybe, Wordpress_Page_Pageacf_TicketsContent_Standing } from "../../../graphql-types";
import { TableWrapper } from "./TemplateTicket.styles";

const TicketTable: React.FC<{
  tickets: Array<Maybe<Pick<Wordpress_Page_Pageacf_TicketsContent_Standing, "kind" | "singleCost" | "seasonpassCost">>>;
}> = ({ tickets, ...rest }) => {
  return (
    <TableWrapper {...rest}>
      <strong
        css={css`
          grid-column: 2;
          text-align: right;
        `}
      >
        Einzelpreis
      </strong>
      <strong
        css={css`
          grid-column: 3;
          text-align: right;
        `}
      >
        Saisonkarte
      </strong>
      {tickets.map((ticket) => {
        if (!ticket) {
          return null;
        }

        return (
          <>
            <span>{ticket.kind}</span>
            <span
              key={ticket.singleCost ?? ""}
              css={css`
                text-align: right;
              `}
            >
              {ticket.singleCost}&nbsp;€
            </span>
            <span
              key={ticket.seasonpassCost ?? ""}
              css={css`
                text-align: right;
              `}
            >
              {ticket.seasonpassCost}&nbsp;€
            </span>
          </>
        );
      })}
    </TableWrapper>
  );
};

export default TicketTable;
