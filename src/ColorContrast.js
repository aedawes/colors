//From https://medium.muz.li/the-science-of-color-contrast-an-expert-designers-guide-33e84c41d156

// Contrast ratios can range from 1 to 21(commonly written 1: 1 to 21: 1).

// (L1 + 0.05) / (L2 + 0.05), whereby:

// L1 is the relative luminance of the lighter of the colors, and
// L2 is the relative luminance of the darker of the colors.
export function calculateContrastRatio(color1, color2) {
    const rgb1 = convertHexToRgb(color1);
    const rgb2 = convertHexToRgb(color2);

    const lum1 = calculateLuminance(rgb1);
    const lum2 = calculateLuminance(rgb2);

    //calculation of contrast ratio from forumla at top of file
    const contrastRatio = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);

    return contrastRatio.toFixed(2);
}

function convertHexToRgb(hex) {

    hex = hex.replace(/^#/, '');

    const bigint = parseInt(hex, 16);

    //Credit: Chapgpt helped me with this calculation
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
}

function calculateLuminance(rgb) {
    const { r, g, b } = rgb;

    //convert to sRGB (fraction of 1 instead of out of 255)
    const sR = r / 255;
    const sG = g / 255;
    const sB = b / 255;

    //credit: chatgpt helped me with this calculation (see end of file for more info)
    const rR = sR <= 0.03928 ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4);
    const rG = sG <= 0.03928 ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4);
    const rB = sB <= 0.03928 ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4);

    return 0.2126 * rR + 0.7152 * rG + 0.0722 * rB;
}

// Calculating Linearized RGB Values:

// Each component(rsrgb, gsrgb, bsrgb) has already been normalized to the range[0, 1].
// These lines perform a non - linear to linear conversion for each component.
// If the normalized value(rsrgb, gsrgb, bsrgb) is less than or equal to 0.03928, it is divided by 12.92.This is a linear approximation of the sRGB transfer function for dark colors.Below this threshold, the sRGB transfer function is approximately linear.
// If the normalized value is greater than 0.03928, it follows a different formula: (value + 0.055) / 1.055 raised to the power of 2.4.This is the inverse of the gamma correction applied in the sRGB color space for brighter colors.

//Why 0.03928 ?

// This value is the linearized threshold below which the sRGB transfer function is considered linear enough to be approximated as a simple division by 12.92.It is calculated as 0.03928 = 0.04045 / 12.92, where 0.04045 is the upper bound of the linear portion of the sRGB transfer function.

// Gamma Correction:

// The sRGB color space uses gamma correction to account for the nonlinear response of typical computer monitors.The gamma correction curve adjusts brightness levels to compensate for the non - linearity of the display device.
// The formula(value + 0.055) / 1.055 is used to linearize values greater than 0.03928.The addition of 0.055 and division by 1.055 accounts for the gamma correction applied in the sRGB color space.