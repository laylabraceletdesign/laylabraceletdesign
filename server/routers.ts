import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getCartItems,
  addToCart,
  removeFromCart,
  clearCart,
  createOrder,
  getOrderById,
  getOrderByNumber,
  getUserOrders,
  createBulkInquiry,
  getBulkInquiries,
  createCustomRequest,
  getCustomRequests,
  createContactSubmission,
  getContactSubmissions,
} from "./db";
import { nanoid } from "nanoid";
import {
  sendOrderConfirmationEmail,
  sendBulkInquiryAcknowledgmentEmail,
  sendCustomRequestAcknowledgmentEmail,
} from "./email";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Products router
  products: router({
    list: publicProcedure.query(async () => {
      return getAllProducts();
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getProductById(input.id);
      }),
    
    getByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        return getProductsByCategory(input.category);
      }),
  }),

  // Cart router
  cart: router({
    getItems: protectedProcedure.query(async ({ ctx }) => {
      return getCartItems(ctx.user.id);
    }),

    addItem: protectedProcedure
      .input(
        z.object({
          productId: z.number(),
          quantity: z.number().min(1),
          customText: z.string().max(12).optional(),
          selectedColor: z.string().optional(),
          selectedSize: z.string().optional(),
          price: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await addToCart({
          userId: ctx.user.id,
          productId: input.productId,
          quantity: input.quantity,
          customText: input.customText,
          selectedColor: input.selectedColor,
          selectedSize: input.selectedSize,
          price: input.price,
        });
        return { success: true };
      }),

    removeItem: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await removeFromCart(input.id);
        return { success: true };
      }),

    clear: protectedProcedure.mutation(async ({ ctx }) => {
      await clearCart(ctx.user.id);
      return { success: true };
    }),
  }),

  // Orders router
  orders: router({
    create: protectedProcedure
      .input(
        z.object({
          totalAmount: z.string(),
          shippingAddress: z.string(),
          customerEmail: z.string().email(),
          customerName: z.string(),
          customerPhone: z.string().optional(),
          items: z.array(z.any()),
          notes: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const orderNumber = `ORD-${Date.now()}-${nanoid(6)}`;
        await createOrder({
          userId: ctx.user.id,
          orderNumber,
          totalAmount: input.totalAmount,
          shippingAddress: input.shippingAddress,
          customerEmail: input.customerEmail,
          customerName: input.customerName,
          customerPhone: input.customerPhone,
          items: input.items,
          notes: input.notes,
        });
        
        // Send confirmation email
        await sendOrderConfirmationEmail(
          input.customerEmail,
          input.customerName,
          orderNumber,
          input.totalAmount,
          input.items
        );
        
        return { orderNumber, success: true };
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getOrderById(input.id);
      }),

    getByNumber: publicProcedure
      .input(z.object({ orderNumber: z.string() }))
      .query(async ({ input }) => {
        return getOrderByNumber(input.orderNumber);
      }),

    getUserOrders: protectedProcedure.query(async ({ ctx }) => {
      return getUserOrders(ctx.user.id);
    }),
  }),

  // Bulk inquiries router
  bulkInquiries: router({
    create: publicProcedure
      .input(
        z.object({
          name: z.string(),
          email: z.string().email(),
          phone: z.string().optional(),
          company: z.string().optional(),
          quantity: z.number().min(1).max(10000),
          eventType: z.string().optional(),
          eventDate: z.string().optional(),
          customizationDetails: z.string().optional(),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const inquiryNumber = `BULK-${Date.now()}-${nanoid(6)}`;
        await createBulkInquiry({
          inquiryNumber,
          name: input.name,
          email: input.email,
          phone: input.phone,
          company: input.company,
          quantity: input.quantity,
          eventType: input.eventType,
          eventDate: input.eventDate,
          customizationDetails: input.customizationDetails,
          message: input.message,
        });
        
        // Send acknowledgment email
        await sendBulkInquiryAcknowledgmentEmail(
          input.email,
          input.name,
          inquiryNumber,
          input.quantity
        );
        
        return { inquiryNumber, success: true };
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new Error("Unauthorized");
      return getBulkInquiries();
    }),
  }),

  // Custom requests router
  customRequests: router({
    create: publicProcedure
      .input(
        z.object({
          name: z.string(),
          email: z.string().email(),
          phone: z.string().optional(),
          description: z.string(),
          logoUrl: z.string().optional(),
          colorPreferences: z.string().optional(),
          budget: z.string().optional(),
          timeline: z.string().optional(),
          quantity: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const requestNumber = `CUSTOM-${Date.now()}-${nanoid(6)}`;
        await createCustomRequest({
          requestNumber,
          name: input.name,
          email: input.email,
          phone: input.phone,
          description: input.description,
          logoUrl: input.logoUrl,
          colorPreferences: input.colorPreferences,
          budget: input.budget,
          timeline: input.timeline,
          quantity: input.quantity,
        });
        
        // Send acknowledgment email
        await sendCustomRequestAcknowledgmentEmail(
          input.email,
          input.name,
          requestNumber
        );
        
        return { requestNumber, success: true };
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new Error("Unauthorized");
      return getCustomRequests();
    }),
  }),

  // Contact submissions router
  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string(),
          email: z.string().email(),
          phone: z.string().optional(),
          subject: z.string(),
          message: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        await createContactSubmission({
          name: input.name,
          email: input.email,
          phone: input.phone,
          subject: input.subject,
          message: input.message,
        });
        return { success: true };
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new Error("Unauthorized");
      return getContactSubmissions();
    }),
  }),
});

export type AppRouter = typeof appRouter;
