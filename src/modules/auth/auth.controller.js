
import ApiResponse from '../../common/utils/api-response.js';
import * as authService from './auth.service.js';

const register = async (req, res) => {
    const userData = await authService.registerService(req.body);
    ApiResponse.created(res, "Account created successfully", userData);
}

const login = async (req, res) => {
    const { id , accessToken, refreshToken, status } = await authService.loginService(req.body);
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    
    ApiResponse.ok(res, "Login successfully", { id, accessToken, status });
};

const seats = async(req, res) => {
    const { rows } = await authService.seatsService();
    res.send(rows);
}

const seatBooked = async(req, res) => {
    const data = await authService.seatBookedService(req);
    res.send(data);
}

export { register, login, seats, seatBooked }
