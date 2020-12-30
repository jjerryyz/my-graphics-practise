
// http://www.flong.com/texts/code/shapers_bez/
// Helper functions:
float slope_from_t(float t, float A, float B, float C) {
  float dtdx = 1.0 / (3.0 * A * t * t + 2.0 * B * t + C);
  return dtdx;
}

float x_from_t(float t, float A, float B, float C, float D) {
  float x = A * (t * t * t) + B * (t * t) + C * t + D;
  return x;
}

float y_from_t(float t, float E, float F, float G, float H) {
  float y = E * (t * t * t) + F * (t * t) + G * t + H;
  return y;
}

float cubic_bezier(float x, float a, float b, float c, float d) {
  float y0a = 0.00; // initial y
  float x0a = 0.00; // initial x
  float y1a = b;    // 1st influence y
  float x1a = a;    // 1st influence x
  float y2a = d;    // 2nd influence y
  float x2a = c;    // 2nd influence x
  float y3a = 1.00; // final y
  float x3a = 1.00; // final x

  float A = x3a - 3.0 * x2a + 3.0 * x1a - x0a;
  float B = 3.0 * x2a - 6.0 * x1a + 3.0 * x0a;
  float C = 3.0 * x1a - 3.0 * x0a;
  float D = x0a;

  float E = y3a - 3.0 * y2a + 3.0 * y1a - y0a;
  float F = 3.0 * y2a - 6.0 * y1a + 3.0 * y0a;
  float G = 3.0 * y1a - 3.0 * y0a;
  float H = y0a;

  // Solve for t given x (using Newton-Raphelson), then solve for y given t.
  // Assume for the first guess that t = x.
  float currentt = x;
  const int nRefinementIterations = 5;
  for (int i = 0; i < nRefinementIterations; i++) {
    float currentx = x_from_t(currentt, A, B, C, D);
    float currentslope = slope_from_t(currentt, A, B, C);
    currentt -= (currentx - x) * (currentslope);
    currentt = clamp(currentt, 0.0, 1.0);
  }

  float y = y_from_t(currentt, E, F, G, H);
  return y;
}