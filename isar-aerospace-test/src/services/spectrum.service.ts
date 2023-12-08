import { get } from './services';

export const getSpectrumStatus = () => get(`${process.env.REACT_APP_API_BASE_URL}/SpectrumStatus`);

export const getActOnSpectrum = () => get(`${process.env.REACT_APP_API_BASE_URL}/ActOnSpectrum`);