export default class Distributions {
    
    // mu: la media.
    // sigma: la desviación estándar.
    // n: cantidad de valores a generar.
    static generateNormal(mu, sigma, n) {
        const results = [];
        for (let i = 0; i < n; i++) {
            let u1 = Math.random();
            let u2 = Math.random();
            let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
            // z0 sigue una distribución normal estándar N(0, 1)
            // Convertimos z0 a una distribución N(mu, sigma^2)
            let value = mu + z0 * sigma;
            results.push(value.toFixed(2));
        }
        return results;
    }
  
    // lambda: el parámetro de tasa, que es el inverso de la media de los eventos.
    // menor lambda -> mayor dispercion
    // n: cantidad de valores a generar.
    static generateExponential(lambda, n) {
        const results = [];
        for (let i = 0; i < n; i++) {
            let u = Math.random();
            let value = -Math.log(1 - u) / lambda;
            results.push(value.toFixed(2));
        }
        return results;
    }
  
  
    static generateRandom(max, n) {
        var results = [];
        for (let i = 0; i < 24; i++) {
            let value = Math.floor(Math.random() * max);
            results.push(value);
        }
        return results;
    }
}