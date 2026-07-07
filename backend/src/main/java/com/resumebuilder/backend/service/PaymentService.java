package com.resumebuilder.backend.service;

import com.resumebuilder.backend.dto.response.PaymentOrderResponse;

public interface PaymentService {
    PaymentOrderResponse createOrder(String email);
    void verifyAndUpgrade(String orderId, String paymentId, String signature, String email);
}