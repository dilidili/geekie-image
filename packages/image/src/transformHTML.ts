type TransformImageEntity = {
  type: string;
  mutability: string;
  data: {
    height: number;
    width: number;
    src: string;
  };
};

const imageTypeAttributeLabel = 'data-geekie-image';
const setDataAttribute = (key: string, value: string): string =>
  `data-${key}="${value}"`;
const getDataAttribute = (node: HTMLElement, key: string): string | null =>
  node.getAttribute(`data-${key}`);

export const imageEntityToHTML = (
  entity: TransformImageEntity
): string | undefined => {
  if (entity.type === 'GEEKIE_IMAGE' && entity.data) {
    const { height, width, src } = entity.data;

    return `<img src="${src}" ${imageTypeAttributeLabel} ${setDataAttribute(
      'width',
      `${height}`
    )} ${setDataAttribute(
      'height',
      `${height}`
    )} style="height: ${height}px;width: ${width}px" />`;
  }

  return undefined;
};

export const htmlToImageEntity = (
  nodeName: string,
  node: HTMLImageElement
): TransformImageEntity | undefined => {
  if (nodeName === 'img' && node.hasAttribute(imageTypeAttributeLabel)) {
    return {
      type: 'GEEKIE_IMAGE',
      mutability: 'IMMUTABLE',
      data: {
        src: node.getAttribute('src') || '',
        height: parseFloat(getDataAttribute(node, 'height') || '500'),
        width: parseFloat(getDataAttribute(node, 'width') || '500'),
      },
    };
  }

  return undefined;
};
