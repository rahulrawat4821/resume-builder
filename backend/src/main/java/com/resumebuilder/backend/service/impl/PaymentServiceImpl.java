package com.resumebuilder.backend.service.impl;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.resumebuilder.backend.dto.response.PaymentOrderResponse;
import com.resumebuilder.backend.entity.User;
import com.resumebuilder.backend.repository.UserRepository;
import com.resumebuilder.backend.service.PaymentService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.time.LocalDateTime;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    private final UserRepository userRepository;

    public PaymentServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public PaymentOrderResponse createOrder(String email) {
        try {
            RazorpayClient client = new RazorpayClient(keyId, keySecret);

            JSONObject options = new JSONObject();
            options.put("amount", 19900); // ₹199 in paise
            options.put("currency", "INR");
            options.put("receipt", "receipt_" + email);
            options.put("payment_capture", 1);

            Order order = client.orders.create(options);
            return new PaymentOrderResponse(
                    order.get("id"),
                    19900,
                    "INR",
                    keyId
            );
        } catch (RazorpayException e) {
            throw new RuntimeException("Failed to create payment order: " + e.getMessage());
        }
    }

    @Override
    public void verifyAndUpgrade(String orderId, String paymentId, String signature, String email) {
        try {
            // Verify signature
            String payload = orderId + "|" + paymentId;
            String generatedSignature = hmacSHA256(payload, keySecret);

            if (!generatedSignature.equals(signature)) {
                throw new RuntimeException("Payment verification failed!");
            }

            // Upgrade user to premium
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            user.setPlan("PREMIUM");
            user.setPlanExpiry(LocalDateTime.now().plusMonths(1));
            userRepository.save(user);

        } catch (Exception e) {
            throw new RuntimeException("Payment verification failed: " + e.getMessage());
        }
    }

    private String hmacSHA256(String data, String secret) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKeySpec = new SecretKeySpec(secret.getBytes(), "HmacSHA256");
        mac.init(secretKeySpec);
        byte[] hash = mac.doFinal(data.getBytes());
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }
}