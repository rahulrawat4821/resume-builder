package com.resumebuilder.backend.controller;

import com.resumebuilder.backend.dto.response.PaymentOrderResponse;
import com.resumebuilder.backend.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<PaymentOrderResponse> createOrder(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(paymentService.createOrder(email));
    }

    @PostMapping("/verify")
    public ResponseEntity<Map<String, String>> verifyPayment(
            @RequestBody Map<String, String> body,
            Authentication authentication) {
        String email = authentication.getName();
        paymentService.verifyAndUpgrade(
                body.get("razorpay_order_id"),
                body.get("razorpay_payment_id"),
                body.get("razorpay_signature"),
                email
        );
        return ResponseEntity.ok(Map.of("message", "Payment successful! You are now Premium!"));
    }
}