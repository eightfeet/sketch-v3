export function fitImageToCanvas(canvasWidth: number, canvasHeight: number, imgWidth: number, imgHeight: number): { dx: number, dy: number, dWidth: number, dHeight: number } {
    let scaleWidth, scaleHeight;
    const aspectRatioImg = imgWidth / imgHeight;
    const aspectRatioCanvas = canvasWidth / canvasHeight;

    if (aspectRatioImg > aspectRatioCanvas) {
        // 图片的宽高比大于画布的宽高比，以高度为准缩放
        scaleHeight = canvasHeight;
        scaleWidth = scaleHeight * aspectRatioImg;
    } else {
        // 图片的宽高比小于或等于画布的宽高比，以宽度为准缩放
        scaleWidth = canvasWidth;
        scaleHeight = scaleWidth / aspectRatioImg;
    }

    // 计算图片在画布上的位置
    const dx = (canvasWidth - scaleWidth) / 2;
    const dy = (canvasHeight - scaleHeight) / 2;
    const dWidth = scaleWidth;
    const dHeight = scaleHeight;

    return { dx, dy, dWidth, dHeight };
}
