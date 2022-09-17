import styled from "styled-components";

export const Section = styled.section`
  display: flex;
  align-self: stretch;
  justify-content: center;
  align-items: ${(props) => props.align || "initial"};
  flex-direction: ${(props) => props.direction || "column"};
  background: ${(props) => props.theme || "transparent"};
  background: ${(props) => props.gradient || "undefined"};
  margin: ${(props) => props.margin || "0px"};
  padding: ${(props) => props.padding || "0px"};
  overflow: ${(props) => props.overflow || "initial"};
  flex: 1;
  position: relative;
`;

export const StandardSize = styled.div`
  width: 360px;
  height: 600px;
  overflow-x: hidden;
  overflow-y: hidden;
`;

export const Standard = styled.div`
  width: 360px;
  height: 600px;
  overflow-y: unset;
  overflow-x: hidden;
`;

export const StandardPage = styled.div`
  width: 360px;
  height: 600px;
  overflow-y: unset;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: ${(props) => props.wrap || "wrap"};
  position: ${(props) => props.position || "relative"};
  background: ${(props) => props.bg || "transparent"};
  flex: ${(props) => props.flex || "1"};
  flex-direction: ${(props) => props.direction || "column"};
  flex-basis: ${(props) => props.flexBasis || "auto"};
  align-self: ${(props) => props.self || "auto"};
  align-items: ${(props) => props.align || "center"};
  justify-content: ${(props) => props.justify || "center"};
  padding: ${(props) => props.padding || "0px"};
  margin: ${(props) => props.margin || "0px"};
  min-width: ${(props) => props.minWidth || "auto"};
  max-width: ${(props) => props.maxWidth || "initial"};
  font-size: ${(props) => props.size || "inherit"};
  text-align: ${(props) => props.textAlign || "inherit"};
  filter: ${(props) => props.filter || "none"};
  box-shadow: ${(props) => props.shadow || "none"};
  top: ${(props) => props.top || "auto"};
  bottom: ${(props) => props.bottom || "auto"};
  left: ${(props) => props.left || "auto"};
  right: ${(props) => props.right || "auto"};

  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};

  border: ${(props) => props.border || "none"};

  border-radius: ${(props) => props.radius || "0px"};
  overflow: ${(props) => props.overflow || "initial"};

  z-index: ${(props) => props.zIndex || "auto"};

  &:hover & {
    filter: ${(props) =>
      (props.filterHover
        ? props.filterHover
        : props.hover
        ? props.hover
        : "none") || "none"};
  }
`;
